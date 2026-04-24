// Name: Dither - Blue Noise
// Author: MustardOS
// Version: 1

float noise(vec2 p) {
    p = fract(p * vec2(0.1031, 0.1030));
    p += dot(p, p.yx + 33.33);
    return fract((p.x + p.y) * p.x);
}

float blue(vec2 p) {
    float n = noise(p)
            + noise(p + vec2(1.3, 0.0)) * 0.5
            + noise(p + vec2(0.0, 1.7)) * 0.5
            + noise(p + vec2(1.3, 1.7)) * 0.25;
    return n / 2.25 - 0.5;
}

void main() {
    vec3 col = texture2D(u_tex, v_uv).rgb;
    float th = blue(v_uv * u_resolution + fract(u_time) * 37.0) * 0.12;

    gl_FragColor = vec4(floor((col + th) * 4.0 + 0.5) / 4.0, 1.0);
}
