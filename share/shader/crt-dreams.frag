// Name: CRT Dreams
// Author: MustardOS
// Version: 1

void main() {
    const float PI = 3.14159265;

    vec2 uv = v_uv * 2.0 - 1.0;
    float r = dot(uv, uv);

    uv = uv * (1.0 + r * 0.05) * 0.5 + 0.5;

    vec3 col = texture2D(u_tex, uv).rgb * step(0.0, uv.x) * step(0.0, uv.y)
                                        * step(uv.x, 1.0) * step(uv.y, 1.0);

    float h = 0.85 + 0.15 * sin(v_uv.y * u_resolution.y * PI);
    float v = 0.92 + 0.08 * sin(v_uv.x * u_resolution.x * PI);

    col *= h * v * (1.0 - r * 0.35);

    gl_FragColor = vec4(col, 1.0);
}
