const math = require("mathjs")


const v1 = matrix([this.vx, this.vy])
                    const v2 = matrix([traffic[i].vx, traffic[i].vy])
                    const r1 = this.r
                    const r2 = traffic[i].r

                    const v1New = zeros(2)
                    const v2New = zeros(2)

                    v1New = (Math.pow(r1,3) - Math.pow(r2,3)) / (Math.pow(r1,3) + Math.pow(r2,3)) * v1 + 2 * Math.pow(r2,3) / (Math.pow(r1,3) + Math.pow(r2,3)) * v2
                    v2New = 2 * Math.pow(r1,3) / (Math.pow(r1, 3) + Math.pow(r2,3)) * v1 - (Math.pow(r1,3) - Math.pow(r2,3)) / (Math.pow(r1,3) + Math.pow(r2,3)) * v2
                    
                    
                    this.vx = v1New[0]
                    this.vy = v1New[1]
                    traffic[i].setVelocity(v2New[0], v2New[1])
                    console.log("test")