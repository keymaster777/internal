// Name: Terminal - Fade Edition
// Author: MustardOS
// Version: 1

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
}

void main() {
    const float PI = 3.14159265;

    vec2 o = vec2(1.5) / u_resolution;

    vec3 col;
    col.r = texture2D(u_tex, v_uv + o).r;
    col.g = texture2D(u_tex, v_uv    ).g;
    col.b = texture2D(u_tex, v_uv - o).b;

    float scan  = fract(v_uv.y + u_time * 0.01);
    float fade  = exp(-scan * 0.15);
    float lines = 0.9 + 0.1 * sin(v_uv.y * u_resolution.y * PI);
    float flick = hash(v_uv * u_resolution + u_time) * 0.04 + 0.96;

    gl_FragColor = vec4(col * (0.4 + 0.6 * fade) * lines * flick, 1.0);
}
