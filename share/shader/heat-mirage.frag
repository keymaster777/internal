// Name: Heat Mirage
// Author: MustardOS
// Version: 2

void main() {
    float t = u_time * 0.025;

    float w1 = sin(v_uv.y * 22.0 + t * 1.5);
    float w2 = sin(v_uv.y * 37.0 - t * 0.8);
    float distort = (w1 + w2) * 0.0025 * (0.4 + v_uv.y);

    vec2 uv = clamp(vec2(v_uv.x + distort, v_uv.y), 0.0, 1.0);
    gl_FragColor = vec4(texture2D(u_tex, uv).rgb, 1.0);
}
