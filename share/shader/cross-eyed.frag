// Name: Cross Eye Depth
// Author: MustardOS
// Version: 1

void main() {
    float side = step(0.5, v_uv.x);
    vec2 base = vec2((v_uv.x - side * 0.5) * 2.0, v_uv.y);

    vec3 src = texture2D(u_tex, base).rgb;
    float depth = dot(src, vec3(0.2126, 0.7152, 0.0722));
    float sep = (3.0 + depth * 8.0) / u_resolution.x;

    float dir = 1.0 - 2.0 * side;
    vec3 col = texture2D(u_tex, base + vec2(sep * dir, 0.0)).rgb;

    gl_FragColor = vec4(col, 1.0);
}
