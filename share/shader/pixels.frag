// Name: Pixels
// Author: MustardOS
// Version: 2

void main() {
    vec2 native = max(u_native_resolution, vec2(1.0));
    vec2 uv = (floor(v_uv * native) + 0.5) / native;
    gl_FragColor = vec4(texture2D(u_tex, uv).rgb, 1.0);
}
