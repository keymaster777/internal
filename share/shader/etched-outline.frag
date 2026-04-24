// Name: Etched Outline
// Author: MustardOS
// Version: 1

void main() {
    const vec3 LUMA = vec3(0.299, 0.587, 0.114);
    vec2 px = 1.0 / u_resolution;

    float a = dot(texture2D(u_tex, v_uv + vec2(-px.x, -px.y)).rgb, LUMA);
    float b = dot(texture2D(u_tex, v_uv + vec2( px.x, -px.y)).rgb, LUMA);
    float c = dot(texture2D(u_tex, v_uv + vec2(-px.x,  px.y)).rgb, LUMA);
    float d = dot(texture2D(u_tex, v_uv + vec2( px.x,  px.y)).rgb, LUMA);

    gl_FragColor = vec4(vec3(abs(a - d) + abs(b - c)), 1.0);
}
