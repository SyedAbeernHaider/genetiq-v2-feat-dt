import * as THREE from "three";

// Check if dark mode is enabled
const isDarkMode = (): boolean => {
	return document.documentElement.getAttribute("data-theme") === "dark";
};

// Set default color based on theme
const getBaseColor = (): THREE.Color => {
	return isDarkMode() 
		? new THREE.Color(1.0, 0.3, 0.1) 
		: new THREE.Color(1.0, 0.2, 0.0);
};

export const painAreaMaterial = new THREE.ShaderMaterial({
	uniforms: {
		time: { value: 0 },
		intensity: { value: 1.0 },
		pulse: { value: 0 },
		baseColor: { value: getBaseColor() },
		isDarkMode: { value: isDarkMode() ? 1.0 : 0.0 }
	},
	vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;

      void main() {
          vUv = uv;
          vPosition = position;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
  `,
	fragmentShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;
      uniform float time;
      uniform float intensity;
      uniform float pulse;
      uniform vec3 baseColor;
      uniform float isDarkMode;

      float rand(vec2 co) {
          return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
      }

      float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 u = fract(p);
          u = u*u*(3.0-2.0*u);

          float res = mix(
              mix(rand(ip), rand(ip+vec2(1.0,0.0)), u.x),
              mix(rand(ip+vec2(0.0,1.0)), rand(ip+vec2(1.0,1.0)), u.x), u.y);
          return res*res;
      }

      void main() {
          vec2 center = vec2(0.5, 0.5);
          float dist = length(vUv - center);
          
          float sharpPulse = pow(abs(sin(time * 2.0)), 3.0);
          float rapidPulse = pow(abs(sin(time * 8.0)), 2.0);
          
          // Reduced pulse intensity multiplier
          float combinedPulse = mix(sharpPulse, rapidPulse, 0.3) * pulse * 0.05; 
          
          float noiseScale = 12.0;
          float noiseValue = noise(vUv * noiseScale + time * 0.5);
          
          float coreBrightness = smoothstep(0.25, 0.0, dist) * (1.5 + combinedPulse * 0.5);
          
          vec3 coreColor;
          vec3 midColor;
          vec3 outerColor;
          
          if (isDarkMode > 0.5) {
              // Dark mode colors - slightly brighter
              coreColor = vec3(1.0, 0.3, 0.1);    // Brighter red core
              midColor = vec3(1.0, 0.4, 0.1);     // More orange-red
              outerColor = vec3(0.9, 0.2, 0.1);   // Less dark red
          } else {
              // Light mode colors
              coreColor = vec3(1.0, 0.2, 0.0);    // Bright red core
              midColor = vec3(1.0, 0.3, 0.0);     // Orange-red
              outerColor = vec3(0.8, 0.1, 0.0);   // Dark red
          }

          vec3 finalColor;
          if (dist < 0.15) {
              finalColor = mix(coreColor, midColor, dist * 6.67);
          } else if (dist < 0.35) {
              finalColor = mix(midColor, outerColor, (dist - 0.15) * 5.0);
          } else {
              finalColor = outerColor;
          }

          float pulseEffect = 1.0 + (combinedPulse * 0.3);
          float alpha = smoothstep(0.7, 0.0, dist);
          
          float distortion = noiseValue * (0.3 + combinedPulse * 0.2);
          alpha *= (0.9 + distortion) * pulseEffect;

          float hotSpots = pow(noiseValue, 3.0) * combinedPulse;
          finalColor += vec3(hotSpots * 0.3, hotSpots * 0.1, 0.0);
          
          finalColor += coreColor * coreBrightness * (1.0 + combinedPulse * 0.5);

          float edgeFade = smoothstep(0.5, 0.0, dist);
          alpha *= edgeFade * intensity;

          alpha *= 0.8 + combinedPulse * 0.2;
          
          // Adjust brightness in dark mode
          if (isDarkMode > 0.5) {
              finalColor *= 1.2; // Increase brightness in dark mode
              alpha *= 1.2;      // Increase opacity in dark mode
          }

          gl_FragColor = vec4(finalColor, alpha * 0.9);
      }
  `,
	transparent: true,
	blending: THREE.AdditiveBlending,
	depthWrite: false,
	side: THREE.DoubleSide,
});

// Update material when theme changes
const updateThemeColors = () => {
	painAreaMaterial.uniforms.baseColor.value = getBaseColor();
	painAreaMaterial.uniforms.isDarkMode.value = isDarkMode() ? 1.0 : 0.0;
	painAreaMaterial.needsUpdate = true;
};

// Set up event listener to detect theme changes
if (typeof window !== 'undefined') {
	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			if (
				mutation.type === 'attributes' &&
				mutation.attributeName === 'data-theme'
			) {
				updateThemeColors();
			}
		});
	});
	
	if (document.documentElement) {
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme']
		});
	}
}
