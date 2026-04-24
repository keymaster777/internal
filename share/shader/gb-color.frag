// Name: Game Boy - Color
// Author: MustardOS
// Version: 1

void main() {
    const float PI = 3.14159265;
    const vec3 LUMA = vec3(0.299, 0.587, 0.114);

    vec3 c0 = texture2D(u_tex, v_uv).rgb;
    vec3 c1 = texture2D(u_tex, v_uv - vec2(1.2 / u_resolution.x, 0.0)).rgb;
    vec3 c = mix(c0, c1, 0.25);

    vec3 col = mix(vec3(dot(c, LUMA)), c, 0.78) * vec3(0.90, 0.96, 0.92);

    float gx     = 0.90 + 0.10 * sin(v_uv.x * u_resolution.x * PI);
    float gy     = 0.94 + 0.06 * sin(v_uv.y * u_resolution.y * PI);
    float column = 0.97  + 0.03  * sin(v_uv.x * u_resolution.x * 1.5708);

    gl_FragColor = vec4(col * gx * gy * column, 1.0);
}
