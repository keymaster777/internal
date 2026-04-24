// Name: Game Boy - Pocket
// Author: MustardOS
// Version: 1

void main() {
    const float PI = 3.14159265;
    const vec3 LUMA = vec3(0.299, 0.587, 0.114);

    const vec3 p0 = vec3(0.05, 0.10, 0.12);
    const vec3 p1 = vec3(0.28, 0.42, 0.45);
    const vec3 p2 = vec3(0.55, 0.70, 0.72);
    const vec3 p3 = vec3(0.82, 0.94, 0.96);

    float l = dot(texture2D(u_tex, v_uv).rgb, LUMA);

    vec3 col = mix(p0, p1, step(0.25, l));
    col = mix(col, p2, step(0.50, l));
    col = mix(col, p3, step(0.75, l));

    float gx = 0.92 + 0.08 * sin(v_uv.x * u_resolution.x * PI);
    float gy = 0.94 + 0.06 * sin(v_uv.y * u_resolution.y * PI);

    gl_FragColor = vec4(col * gx * gy, 1.0);
}
