// Name: Game Boy - DMG Alt
// Author: MustardOS
// Version: 1

void main() {
    const float PI = 3.14159265;
    const vec3 LUMA = vec3(0.299, 0.587, 0.114);

    const vec3 p0 = vec3(0.06, 0.16, 0.06);
    const vec3 p1 = vec3(0.19, 0.38, 0.19);
    const vec3 p2 = vec3(0.55, 0.67, 0.26);
    const vec3 p3 = vec3(0.85, 0.93, 0.09);

    vec3 c0 = texture2D(u_tex, v_uv).rgb;
    vec3 c1 = texture2D(u_tex, v_uv - vec2(1.2 / u_resolution.x, 0.0)).rgb;
    float l = dot(mix(c0, c1, 0.25), LUMA);

    vec3 col = mix(p0, p1, step(0.25, l));
    col = mix(col, p2, step(0.50, l));
    col = mix(col, p3, step(0.75, l));

    float gx     = 0.92 + 0.08 * sin(v_uv.x * u_resolution.x * PI);
    float gy     = 0.94 + 0.06 * sin(v_uv.y * u_resolution.y * PI);
    float column = 0.97  + 0.03  * sin(v_uv.x * u_resolution.x * 1.5708);

    gl_FragColor = vec4(col * gx * gy * column, 1.0);
}
