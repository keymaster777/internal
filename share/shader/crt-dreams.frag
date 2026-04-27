// Name: CRT Dreams
// Author: MustardOS
// Version: 2

vec2 native_res() {
    return max(u_native_resolution, vec2(1.0));
}

float edge_mask(vec2 uv) {
    vec2 d = min(uv, 1.0 - uv);
    return smoothstep(0.010, 0.040, min(d.x, d.y));
}

vec2 curved_uv(vec2 uv) {
    vec2 p = uv * 2.0 - 1.0;
    float aspect = u_resolution.x / u_resolution.y;

    p.x *= aspect;
    p *= 1.0 + dot(p, p) * 0.035;
    p.x /= aspect;

    return p * 0.5 + 0.5;
}

vec2 snap_uv(vec2 uv) {
    vec2 n = native_res();
    return (floor(uv * n) + 0.5) / n;
}

vec3 triad_mask(vec2 frag_coord) {
    vec2 scale = max(u_resolution / native_res(), vec2(1.0));
    float x = floor(frag_coord.x / scale.x);
    float m = mod(x, 3.0);

    if (m < 1.0) return vec3(1.00, 0.985, 0.985);
    if (m < 2.0) return vec3(0.985, 1.00, 0.985);
    return vec3(0.985, 0.985, 1.00);
}

void main() {
    const float PI = 3.14159265;

    vec2 uv = curved_uv(v_uv);
    vec2 n = native_res();
    float edge;
    vec2 suv;
    vec3 col;
    vec2 centred;
    float r;
    float luma;
    float mask_strength;

    if (uv.x <= 0.0 || uv.x >= 1.0 || uv.y <= 0.0 || uv.y >= 1.0) {
        gl_FragColor = vec4(0.0);
        return;
    }

    edge = edge_mask(uv);
    suv = mix(uv, snap_uv(uv), 0.62);

    col = texture2D(u_tex, suv).rgb;

    centred = uv * 2.0 - 1.0;
    r = dot(centred, centred);

    col *= 0.95 + 0.05 * sin((suv.y + 0.0005) * n.y * PI);
    col *= 0.99 + 0.01 * sin((suv.x + 0.0005) * n.x * PI);
    col *= 1.0 - r * 0.18;

    luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
    mask_strength = edge * smoothstep(0.12, 0.45, luma) * 0.10;
    col *= mix(vec3(1.0), triad_mask(gl_FragCoord.xy), mask_strength);

    col *= edge;

    gl_FragColor = vec4(col, 1.0);
}
