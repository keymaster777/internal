// Name: Heat Mirage
// Author: MustardOS
// Version: 1

void main() {
    float t = u_time * 0.025;

    float w1 = sin(v_uv.y * 22.0 + t * 1.5);
    float w2 = sin(v_uv.y * 37.0 - t * 0.8);
    float distort = (w1 + w2) * 0.0025 * (0.4 + v_uv.y);

    gl_FragColor = vec4(texture2D(u_tex, vec2(v_uv.x + distort, v_uv.y)).rgb, 1.0);
}
