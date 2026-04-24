// Name: TV RF Output
// Author: MustardOS
// Version: 1

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
}

void main() {
    const float PI = 3.14159265;
    const vec3 LUMA = vec3(0.299, 0.587, 0.114);

    float px  = 1.0 / u_resolution.x;
    float px2 = px * 2.0;

    vec3 c0 = texture2D(u_tex, v_uv).rgb;
    vec3 c1 = texture2D(u_tex, v_uv + vec2(px,  0.0)).rgb;
    vec3 c2 = texture2D(u_tex, v_uv - vec2(px,  0.0)).rgb;
    vec3 c3 = texture2D(u_tex, v_uv + vec2(px2, 0.0)).rgb;
    vec3 c4 = texture2D(u_tex, v_uv - vec2(px2, 0.0)).rgb;

    vec3 col = mix(vec3(dot(c0, LUMA)), (c1 + c2 + c3 + c4) * 0.25, 0.8);

    col += texture2D(u_tex, v_uv - vec2(px2 * 2.0, 0.0)).r * 0.25;
    col += hash(v_uv * u_resolution + u_time) * 0.08 - 0.04;
    col *= 0.85 + 0.15 * sin(v_uv.y * u_resolution.y * PI);

    gl_FragColor = vec4(col, 1.0);
}
