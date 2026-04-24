// Name: Game Boy - DMG
// Author: MustardOS
// Version: 1

void main() {
    const float PI = 3.14159265;
    const vec3 LUMA = vec3(0.299, 0.587, 0.114);

    const vec3 p0 = vec3(0.08, 0.12, 0.06);
    const vec3 p1 = vec3(0.25, 0.36, 0.12);
    const vec3 p2 = vec3(0.56, 0.67, 0.22);
    const vec3 p3 = vec3(0.82, 0.90, 0.38);

    vec3 c0 = texture2D(u_tex, v_uv).rgb;
    vec3 c1 = texture2D(u_tex, v_uv - vec2(1.5 / u_resolution.x, 0.0)).rgb;
    vec3 c = mix(c0, c1, 0.35);

    float l = dot(c, LUMA);

    vec3 col = mix(p0, p1, step(0.25, l));
    col = mix(col, p2, step(0.50, l));
    col = mix(col, p3, step(0.75, l));

    float gx     = 0.90 + 0.10 * sin(v_uv.x * u_resolution.x * PI);
    float gy     = 0.95 + 0.05 * sin(v_uv.y * u_resolution.y * PI);
    float column = 0.96  + 0.04  * sin(v_uv.x * u_resolution.x * 1.5708);

    col *= gx * gy * column;

    float g = dot(col, LUMA);
    gl_FragColor = vec4(mix(vec3(g), col, 0.75), 1.0);
}
