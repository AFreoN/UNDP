import * as THREE from 'three'

var uniforms = THREE.UniformsUtils.merge(
  [THREE.UniformsLib['lights'],
  {
    u_opacity: {  value: 0.8},  //prev 0.8
    fresnelExponent : { value : 2.5}
  }
  ]
);

export const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: `
      varying vec3 vPositionW;
      varying vec3 vNormalW;

      ${THREE.ShaderChunk.skinning_pars_vertex}

      void main()
      {
          mat4 modelViewProjectionMatrix = projectionMatrix * modelViewMatrix;

          vPositionW = vec3( vec4( position, 1.0 ) * modelMatrix);

          //vNormalW = vec3(modelViewMatrix * vec4(vec3( position ), 1.0));
          vNormalW = normal;

          ${THREE.ShaderChunk.beginnormal_vertex}
          ${THREE.ShaderChunk.skinbase_vertex}
          ${THREE.ShaderChunk.skinnormal_vertex}

          vec3 transformed = vec3( position );

          //Transform vertex by modelview and projection matrices

          ${THREE.ShaderChunk.skinning_vertex}

          gl_Position = modelViewProjectionMatrix * vec4( transformed, 1.0 );

      }`,
      fragmentShader: `
      varying vec3 vPositionW;
      varying vec3 vNormalW;

      uniform float u_opacity;
      uniform float fresnelExponent;

      void main()
      {
        vec3 color = vec3(1., 0.98, 0.78);    //vec3(.58, .74, 1.)
        vec3 objectColor = vec3(1.0,0.76,0.2);  //orange-yellow vec3(1.0,0.76,0.2)    //yellow vec3(1.0,0.89,0.1)
        vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
        float fresnelTerm = dot(viewDirectionW, vNormalW);// * (1. - u_opacity/2.);
        fresnelTerm = clamp(1.0 - fresnelTerm, 0., 1.);
        fresnelTerm = pow(fresnelTerm, fresnelExponent);
    
        gl_FragColor = vec4( color * fresnelTerm, 1.) * u_opacity + vec4( objectColor, 1.);
        //gl_FragColor.rgb = gl_FragColor.rgb * objectColor;
        //gl_FragColor.rgb = mix(gl_FragColor.rgb, objectColor, 1.0);
        //gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0);
      }`,
      lights : false
  });

  export const shaderUnlit = new THREE.ShaderMaterial({
    uniforms:   {
      u_opacity: {  value: 0.8},  //prev 0.8
      fresnelExponent : { value : 2.5}
    },
    vertexShader: `
    varying vec3 vPositionW;
    varying vec3 vNormalW;

    ${THREE.ShaderChunk.skinning_pars_vertex}

    void main()
    {
        mat4 modelViewProjectionMatrix = projectionMatrix * modelViewMatrix;

        vPositionW = vec3( vec4( position, 1.0 ) * modelMatrix);

        //vNormalW = vec3(modelViewMatrix * vec4(vec3( position ), 1.0));
        vNormalW = normal;

        ${THREE.ShaderChunk.beginnormal_vertex}
        ${THREE.ShaderChunk.skinbase_vertex}
        ${THREE.ShaderChunk.skinnormal_vertex}

        vec3 transformed = vec3( position );

        //Transform vertex by modelview and projection matrices

        ${THREE.ShaderChunk.skinning_vertex}

        gl_Position = modelViewProjectionMatrix * vec4( transformed, 1.0 );

    }`,
    fragmentShader: `
    varying vec3 vPositionW;
    varying vec3 vNormalW;

    uniform float u_opacity;
    uniform float fresnelExponent;

    void main()
    {
      vec3 color = vec3(1., 0.98, 0.78);    //vec3(.58, .74, 1.)
      vec3 objectColor = vec3(1.0,0.76,0.2);  //orange-yellow vec3(1.0,0.76,0.2)    //yellow vec3(1.0,0.89,0.1)
      vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
      float fresnelTerm = dot(viewDirectionW, vNormalW);// * (1. - u_opacity/2.);
      fresnelTerm = clamp(1.0 - fresnelTerm, 0., 1.);
      fresnelTerm = pow(fresnelTerm, fresnelExponent);
  
      gl_FragColor = vec4( color * fresnelTerm, 1.) * u_opacity + vec4( objectColor, 1.);
      //gl_FragColor.rgb = gl_FragColor.rgb * objectColor;
      //gl_FragColor.rgb = mix(gl_FragColor.rgb, objectColor, 1.0);
      //gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0);
    }`
});

  /*
  export const shaderMaterial = new THREE.ShaderMaterial({
    uniforms:
      {
        Edge: { type: 'f', value: 1}
      },
      vertexShader: `varying vec3 N;
      varying vec3 I;

      ${THREE.ShaderChunk.skinning_pars_vertex}

      void main()
      {
          mat4 modelViewProjectionMatrix = projectionMatrix * modelViewMatrix;

          ${THREE.ShaderChunk.beginnormal_vertex}
          ${THREE.ShaderChunk.skinbase_vertex}
          ${THREE.ShaderChunk.skinnormal_vertex}

          vec3 transformed = vec3( position );

          //Transform vertex by modelview and projection matrices

          ${THREE.ShaderChunk.skinning_vertex}

          gl_Position = modelViewProjectionMatrix * vec4( transformed, 1.0 );

          // Normal transform (transposed model-view inverse)
          N = normalMatrix * objectNormal;

          // Incident vector
          I = vec3(modelViewMatrix * vec4(transformed, 1.0));

      }`,
      fragmentShader: `varying vec3 N;
      varying vec3 I;

      uniform float Edge;

      void main()
      {
          float opacity = dot(normalize(N), normalize(-I));
          opacity = abs(opacity);
          opacity = 1.0 - pow(opacity, Edge);

          gl_FragColor = vec4(1.0, 1.0, 1.0, opacity);
      }`
    });
  */