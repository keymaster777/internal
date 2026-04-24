// Name: Sharpen
// Author: MustardOS
// Version: 1

void main() {
    vec2 px = 1.0 / u_resolution;
    vec3 c = texture2D(u_tex, v_uv).rgb;

    vec3 blur = (texture2D(u_tex, v_uv + vec2(px.x, 0.0)).rgb
               + texture2D(u_tex, v_uv - vec2(px.x, 0.0)).rgb
               + texture2D(u_tex, v_uv + vec2(0.0, px.y)).rgb
               + texture2D(u_tex, v_uv - vec2(0.0, px.y)).rgb) * 0.25;

    gl_FragColor = vec4(c + (c - blur) * 0.8, 1.0);
}
