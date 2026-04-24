// Name: Aperture Grille
// Author: MustardOS
// Version: 1

void main() {
    vec3 col = texture2D(u_tex, v_uv).rgb;

    float xi = mod(v_uv.x * u_resolution.x, 3.0);

    vec3 mask;
    if (xi < 1.0)      mask = vec3(1.0, 0.25, 0.25);
    else if (xi < 2.0) mask = vec3(0.25, 1.0, 0.25);
    else               mask = vec3(0.25, 0.25, 1.0);

    col *= mix(vec3(0.8), mask, 0.5);

    gl_FragColor = vec4(col, 1.0);
}
