// Name: Red Blue Stereo
// Author: MustardOS
// Version: 1

void main() {
    float px = 1.0 / u_resolution.x;
    float depth = px * 5.0 + sin(u_time * 0.18) * px * 0.6;

    vec3 left   = texture2D(u_tex, v_uv - vec2(depth, 0.0)).rgb;
    vec3 right  = texture2D(u_tex, v_uv + vec2(depth, 0.0)).rgb;
    vec3 center = texture2D(u_tex, v_uv).rgb;

    gl_FragColor = vec4(mix(center, vec3(left.r, right.g, right.b), 0.85), 1.0);
}
