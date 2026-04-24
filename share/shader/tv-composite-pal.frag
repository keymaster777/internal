// Name: TV Composite (PAL) Output
// Author: MustardOS
// Version: 1

void main() {
    const float PI = 3.14159265;
    const vec3 LUMA = vec3(0.299, 0.587, 0.114);

    float px = 1.0 / u_resolution.x;

    vec3 c0 = texture2D(u_tex, v_uv).rgb;
    vec3 c1 = texture2D(u_tex, v_uv + vec2(px,       0.0)).rgb;
    vec3 c2 = texture2D(u_tex, v_uv - vec2(px,       0.0)).rgb;
    vec3 c3 = texture2D(u_tex, v_uv + vec2(px * 2.0, 0.0)).rgb;

    vec3 col = mix(vec3(dot(c0, LUMA)), (c1 + c2 + c3) * (1.0 / 3.0), 0.7);

    col.rg += mod(floor(v_uv.y * u_resolution.y), 2.0) * 0.03;
    col    *= 0.9 + 0.1 * sin(v_uv.y * u_resolution.y * PI);

    gl_FragColor = vec4(col, 1.0);
}
