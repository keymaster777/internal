// Name: Aperture Grille
// Author: MustardOS
// Version: 2

vec2 native_res() {
    return max(u_native_resolution, vec2(1.0));
}

vec2 snap_uv(vec2 uv) {
    vec2 n = native_res();
    return (floor(uv * n) + 0.5) / n;
}

vec3 grille_mask(float x) {
    float m = mod(x, 3.0);

    if (m < 1.0) return vec3(1.00, 0.28, 0.28);
    if (m < 2.0) return vec3(0.28, 1.00, 0.28);
    return vec3(0.28, 0.28, 1.00);
}

void main() {
    vec2 n = native_res();
    vec2 uv = snap_uv(v_uv);
    vec3 col = texture2D(u_tex, uv).rgb;

    float x = floor(v_uv.x * n.x);
    float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
    float strength = 0.50 * smoothstep(0.05, 0.30, luma);

    col *= mix(vec3(0.80), grille_mask(x), strength);

    gl_FragColor = vec4(col, 1.0);
}
