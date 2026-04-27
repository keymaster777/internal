// Name: Game Boy - Advanced
// Author: MustardOS
// Version: 2

vec2 native_res() {
    return max(u_native_resolution, vec2(1.0));
}

vec2 clamp_uv(vec2 uv) {
    vec2 px = 0.5 / native_res();
    return clamp(uv, px, 1.0 - px);
}

vec2 snap_uv(vec2 uv) {
    vec2 n = native_res();
    return clamp_uv((floor(uv * n) + 0.5) / n);
}

vec3 sample_rgb(vec2 uv) {
    return texture2D(u_tex, clamp_uv(uv)).rgb;
}

float edge_x(vec2 uv) {
    vec2 n = native_res();
    float px = uv.x * n.x;
    return smoothstep(1.5, 4.0, px) *
           smoothstep(1.5, 4.0, (n.x - 1.0) - px);
}

vec3 soft_sample(vec2 uv, vec2 px) {
    vec3 c;

    c = sample_rgb(uv) * 0.70;
    c += sample_rgb(uv - vec2(px.x, 0.0)) * 0.15;
    c += sample_rgb(uv + vec2(px.x, 0.0)) * 0.10;
    c += sample_rgb(uv - vec2(0.0, px.y)) * 0.025;
    c += sample_rgb(uv + vec2(0.0, px.y)) * 0.025;

    return c;
}

void main() {
    const float PI = 3.14159265;

    vec2 n = native_res();
    vec2 uv = snap_uv(v_uv);
    vec2 px = 1.0 / n;

    vec3 c = soft_sample(uv, px * 0.45);
    float l = dot(c, vec3(0.299, 0.587, 0.114));
    vec3 col = mix(vec3(l), c, 0.98) * vec3(1.00, 0.99, 0.94);

    float ex = edge_x(uv);
    float gx = mix(1.0, 0.96 + 0.04 * sin(uv.x * n.x * PI), ex);
    float gy = 0.98 + 0.02 * sin(uv.y * n.y * PI);
    float column = mix(1.0, 0.990 + 0.010 * sin(uv.x * n.x * 1.5708), ex);

    col *= gx * gy;
    col *= column;

    gl_FragColor = vec4(col, 1.0);
}
