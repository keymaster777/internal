// Name: Game Boy - Color Alt.
// Author: MustardOS
// Version: 1

void main() {
    const float PI = 3.14159265;
    const vec3 LUMA = vec3(0.299, 0.587, 0.114);

    vec3 c0 = texture2D(u_tex, v_uv).rgb;
    vec3 c1 = texture2D(u_tex, v_uv - vec2(1.2 / u_resolution.x, 0.0)).rgb;
    vec3 c = mix(c0, c1, 0.28);

    vec3 col = mix(vec3(dot(c, LUMA)), c, 0.82) * vec3(0.94, 0.98, 0.88);

    float gx     = 0.89 + 0.11 * sin(v_uv.x * u_resolution.x * PI);
    float gy     = 0.93 + 0.07 * sin(v_uv.y * u_resolution.y * PI);
    float column = 0.965 + 0.035 * sin(v_uv.x * u_resolution.x * 1.5708);

    gl_FragColor = vec4(col * gx * gy * column, 1.0);
}
