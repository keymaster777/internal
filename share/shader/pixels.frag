// Name: Pixels
// Author: MustardOS
// Version: 1

void main() {
    const float size = 128.0;

    vec2 grid = vec2(size, size * (u_resolution.y / u_resolution.x));
    vec2 uv = floor(v_uv * grid) / grid;

    gl_FragColor = vec4(texture2D(u_tex, uv).rgb, 1.0);
}
