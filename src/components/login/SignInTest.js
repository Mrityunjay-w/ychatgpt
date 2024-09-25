import React, { useRef } from 'react';
import { extend, useFrame, Canvas } from 'react-three-fiber';
import { ShaderMaterial, PlaneGeometry } from 'three';
import { useNavigate } from 'react-router-dom';

// Extend THREE namespace to include ShaderMaterial
extend({ ShaderMaterial, PlaneGeometry });

// Custom material RippleMaterial
const RippleMaterial = {
    uniforms: {
        time: { value: 1.0 },
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float time;
    varying vec2 vUv;
    void main() {
      vec2 p = -1.0 + 2.0 * vUv;
      float a = time * 40.0;
      float d, e, f, g = 1.0 / 40.0, h, i, r, q;
      e = 400.0 * (p.x * 0.5 + 0.5);
      f = 400.0 * (p.y * 0.5 + 0.5);
      i = 200.0 + sin(e * g + a / 150.0) * 20.0;
      d = 200.0 + cos(f * g / 2.0) * 18.0 + cos(e * g) * 7.0;
      r = sqrt(pow(i - e, 2.0) + pow(d - f, 2.0));
      q = f / r;
      e = (r * cos(q)) - a / 2.0;
      f = (r * sin(q)) - a / 2.0;
      d = sin(e * g) * 176.0 + sin(e * g) * 164.0 + r;
      h = ((f + d) + a / 2.0) * g;
      i = cos(h + r * p.x / 1.3) * (e + e + a) + cos(q * g * 6.0) * (r + h / 3.0);
      h = sin(f * g) * 144.0 - sin(e * g) * 212.0 * p.x;
      h = (h + (f - e) * q + sin(r - (a + h) / 7.0) * 10.0 + i / 4.0) * g;
      i += cos(h * 2.3 * sin(a / 350.0 - q)) * 184.0 * sin(q - (r * 4.3 + a / 12.0) * g) + tan(r * g + h) * 184.0 * cos(r * g + h);
      i = mod(i / 5.6, 256.0) / 64.0;
      if (i < 0.0) i += 4.0;
      if (i >= 2.0) i = 4.0 - i;
      d = r / 350.0;
      d += sin(d * d * 8.0) * 0.52;
      f = (sin(a * g) + 1.0) / 2.0;

      // Check if the pixel is close to the border
      if (length(p - vec2(0.5, 0.5)) > 0.4) {
        // Set color to transparent for pixels outside the border

        

        // Set color to #004f9b
      gl_FragColor = mix(vec4(0.0, 0.0, 0.0, 1.0), vec4(0.0, 0.31, 0.607, 1.0), clamp((i + d + f) / 3.0, 0.0, 1.0));

        
      } else {
        // Calculate color for pixels inside the border
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
      }

 
    }
  `,
};

// Ripple component
const Ripple = () => {
    const material = useRef();

    useFrame(({ clock }) => {
        // Update time uniform in the shader
        material.current.uniforms.time.value = clock.elapsedTime;
    });

    return (
        <mesh scale={[window.innerWidth, window.innerHeight, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial ref={material} args={[RippleMaterial]} wireframe={false} />
        </mesh>
    );
};

const SingnInAnm = () => {

     const navigate = useNavigate();

    // Function to handle admin menu click and redirect to Dashboard
    const handleSigninClick = () => {
       navigate('/login'); // Adjust the path based on your route configuration
    };

    return (
        <div>

            <div style={{ height: '100vh', backgroundColor: '#004f9b' }}>
                <div>
                    <button onClick={handleSigninClick}  style={{ position: 'relative', left: '1076px', height: '28px', width: '89px', border: '11px', top: '10px', borderRadius: '5px', backgroundColor: 'rgb(0 79 154)', fontSize: '15px', color: 'white', fontWeight: 'bold' }}>
                        Sign In
                    </button>
                </div>
                <img src='assets/logosignin.png' style={{ height: '63px', position: 'relative', bottom: '344px', left: '0px',width:'188px' }} />
                {/* below image before left 551px */}
                <img src='assets/robot.jpg' style={{ position: 'relative', height: '65vh', mixBlendMode: 'plus-lighter', filter: 'contrast(1.5)', left: '98px', objectFit: 'cover', top: '21px' }} />

                {/* <img src='assets/machine.jpg' style={{ position: 'relative', height: '65vh',mixBlendMode:'plus-lighter',filter:'contrast(1.5)',left:'308px',objectFit:'cover',top:'21px' }} /> */}

                {/* <img src='assets/engine.jpg' style={{ position: 'relative', height: '65vh',mixBlendMode:'plus-lighter',filter:'contrast(1.5)' }} /> */}

                <div>
                    <Canvas style={{ position: 'relative', top: 48, left: 0, bottom: 0, height: 110 }} camera={{ fov: 75, position: [0, 0, 5] }}>
                        <ambientLight />
                        <pointLight position={[10, 10, 10]} />
                        <Ripple />
                    </Canvas>
                </div>
            </div>
        </div>
    )
}

export default SingnInAnm;