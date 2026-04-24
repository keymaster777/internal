// Name: Blurry
// Author: MustardOS
// Version: 1

void main() {
    vec2 o = vec2(6.0 / u_resolution.x, 0.0);
    vec2 o2 = o * 2.0;

    vec3 col = texture2D(u_tex, v_uv - o2).rgb * 0.10
             + texture2D(u_tex, v_uv - o ).rgb * 0.20
             + texture2D(u_tex, v_uv     ).rgb * 0.40
             + texture2D(u_tex, v_uv + o ).rgb * 0.20
             + texture2D(u_tex, v_uv + o2).rgb * 0.10;

    gl_FragColor = vec4(col, 1.0);
}
