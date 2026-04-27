// Name: Dither - Bayer
// Author: MustardOS
// Version: 2

vec2 native_res() {
    return max(u_native_resolution, vec2(1.0));
}

float bayer(vec2 p) {
    p = mod(floor(p), 4.0);

    float a = mod(p.x, 2.0);
    float b = mod(floor(p.x * 0.5), 2.0);
    float c = mod(p.y, 2.0);
    float d = mod(floor(p.y * 0.5), 2.0);

    return (a + b * 2.0 + c * 4.0 + d * 8.0) / 16.0 - 0.5;
}

void main() {
    vec3 col = texture2D(u_tex, v_uv).rgb;
    float th = bayer(v_uv * native_res()) * 0.12;

    gl_FragColor = vec4(floor((col + th) * 4.0 + 0.5) / 4.0, 1.0);
}
