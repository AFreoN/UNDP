import * as THREE from 'three' 

export const fresnel = {
    vertexShader: `
    varying vec3 vPositionW;
    varying vec3 vNormalW;
  
    #include <skinning_pars_vertex>

    void main()
    {
        vPositionW = vec3( vec4( position, 1.0 ) * modelMatrix);

        //vNormalW = vec3(modelViewMatrix * vec4(vec3( position ), 1.0));
        vNormalW = normal;

        #include <skinbase_vertex>
        #include <begin_vertex>
        #include <project_vertex>
        
        #include <skinning_vertex>
    
        gl_Position = projectionMatrix * modelViewMatrix * vec4( vec3( position ), 1.0 );

    }
  `,
    fragmentShader: `
    varying vec3 vPositionW;
    varying vec3 vNormalW;
    uniform float u_opacity;
  
    void main() {
          
      vec3 color = vec3(.58, .74, 1.);
      vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
      float fresnelTerm = dot(viewDirectionW, vNormalW) * (1. - u_opacity/2.);
      fresnelTerm = clamp(1.0 - fresnelTerm, 0., 1.);
  
      gl_FragColor = vec4( color * fresnelTerm, 1.) * u_opacity;
        //gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0);
    }
  `
  };

  /*
    vertexShader: `
    varying vec3 vPositionW;
    varying vec3 vNormalW;
  
    void main() {
  
      vPositionW = vec3( vec4( position, 1.0 ) * modelMatrix);
      vNormalW = normalize( vec3( vec4( normal, 0.0 ) * modelMatrix ));
  
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  
    } 
  `
  */
  