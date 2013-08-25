/// <reference path="./constants.ts"/>
/// <reference path="./series/tangents.ts"/>
/// <reference path="./track.ts"/>
/// <reference path="./obstacle.ts"/>
/// <reference path="./paintableSet.ts"/>
/// <reference path="./scene.ts"/>
/// <reference path="./series/path.ts"/>

var SVG_WIDTH = 690;

module examples {
    
    import geometry = geometry;
    import c = constants;
    import Scene = scene.Scene;
    import tangent = tangent;
    import Track = track.Track;
    import Obstacle = obstacle.Obstacle;
    import PaintableSet = paintableSet.PaintableSet;
    import Path = path.Path;
    
    /*
    var topObstacle = new Obstacle(245, 105, 75, "topObstacle");
    var bottomObstacle = new Obstacle(380, 260, 80, "bottomObstacle");
    var topStart = new Obstacle(94, 140, 20, "topStart");
    var bottomStart = new Obstacle(50, 260, 20, "bottomStart");
    var topEnd = new Obstacle(600, 110, 20, "topEnd");
    var bottomEnd = new Obstacle(540, 180, 20, "bottomEnd");
    */
    
    var recipes = {
        
        firstExample: function (element:Element) {
            
            var scene = new Scene({
                parent: element,
                width: SVG_WIDTH,
                height: 350,
            });
    
            var obs = PaintableSet({
                r1c1: new Obstacle(194, 75,  7.5),
                r1c2: new Obstacle(294, 75,  7.5),
                r1c3: new Obstacle(394, 75,  7.5),
                r1c4: new Obstacle(494, 75,  7.5),
                r2c1: new Obstacle(194, 175, 7.5),
                r2c2: new Obstacle(294, 175, 7.5),
                r2c3: new Obstacle(394, 175, 7.5),
                r2c4: new Obstacle(494, 175, 7.5),
                r3c1: new Obstacle(194, 275, 7.5),
                r3c2: new Obstacle(294, 275, 7.5),
                r3c3: new Obstacle(394, 275, 7.5),
                r3c4: new Obstacle(494, 275, 7.5),
            });
            
            var tracks = PaintableSet({
                foo: new Track( obs.r1c1, c.TRACK_WIDTH ),
            });
            
            tracks.foo.clockwise( obs.r1c2 )
                      .clockwise( obs.r2c2 )
                      .anticlockwise( obs.r2c1 )
                      .center( obs.r3c2 )
                      .center( obs.r3c3 )
                      .anticlockwise( obs.r3c4 )
                      .anticlockwise( obs.r2c4 )
                      .clockwise( obs.r2c3 )
                      .center( obs.r1c4 );
            
            obs.paint(scene);
            tracks.paint(scene);
        },
        
        secondExample: function (element:Element) {
            
            var scene = new Scene({
                parent: element,
                width: SVG_WIDTH,
                height: 300,
            });
    
            var obs = PaintableSet({
                topObstacle : new Obstacle(245 +20, 105, 75),
                bottomObstacle : new Obstacle(380 +20, 260, 80),
                topStart : new Obstacle(94 +20, 140, 20),
                bottomStart : new Obstacle(50 +20, 260, 20),
                topEnd : new Obstacle(600 +20, 110, 20),
                bottomEnd : new Obstacle(540 +20, 180, 20),
            });
            
            var tracks = PaintableSet({
                foo: new Track( obs.topStart, c.TRACK_WIDTH ),
                bar: new Track( obs.bottomStart, c.TRACK_WIDTH),
            });
            
            tracks.foo.anticlockwise( obs.topObstacle )
                      .clockwise( obs.bottomObstacle )
                      .center( obs.bottomEnd );
            
            tracks.bar.clockwise( obs.topStart )
                      .clockwise( obs.topObstacle )
                      .center( obs.topEnd );
            
            obs.paint(scene);
            tracks.paint(scene);
        },
        
        thirdExample: function (element:Element) {
            
            var SVG_HEIGHT = 350;
            
            var scene = new Scene({
                parent: element,
                width: SVG_WIDTH,
                height: SVG_HEIGHT,
            });
            
            var halfHeight = SVG_HEIGHT / 2
            var obs = PaintableSet({
                left : new Obstacle(halfHeight+10, 175, 30),
                right : new Obstacle(SVG_WIDTH-halfHeight-70, 175, 50),
            });
            obs.paint(scene);
    
            var buildCircle = function (x: number, y: number, radius: number) :Element {
                
                var circle :Element = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
                circle.setAttribute("cx", x.toString());
                circle.setAttribute("cy", y.toString());
                circle.setAttribute("r", radius.toString());
                return circle;
            };

            var element = buildCircle(obs.right.x, obs.right.y, obs.right.effectiveRadius + obs.left.effectiveRadius);
            scene.groups.innerOrbits.appendChild(element);
            
            
            var path = new Path(obs.left, 2);
            var stretch = new Stretch(obs.left, c.CENTER, obs.right, c.CLOCKWISE);
            path.lineTo(stretch.end);
            path.lineTo(obs.right);
            path.lineTo(obs.left);
            path.paint(scene, 'annotations');
            
        },
        
    };
    
    export function paint() {
        
        for (var id in recipes) {
            
            // For each function in recipes, try to find the corresponding id in the document. If it
            // exists, execute the function (this will make an SVG drawing in the element with that
            // id).
            
            var htmlElement = document.getElementById(id);
            if (htmlElement) {
                var func = recipes[id];
                func(htmlElement);
            }
        }
    }
}
