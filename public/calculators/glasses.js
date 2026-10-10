/* Pixel glassware. Each shape is a grid of characters, one per pixel:
     #  the glass itself
     o  what is in it
     .  nothing
   Drawn as plain rects with crisp edges, so it stays pixel art at any size. */
var GLASS = {
 shot: [
  '#........#',
  '#........#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '##########'],

 tumbler: [
  '#..........#',
  '#..........#',
  '#..........#',
  '#oooooooooo#',
  '#oooooooooo#',
  '#oooooooooo#',
  '#oooooooooo#',
  '#oooooooooo#',
  '#oooooooooo#',
  '#oooooooooo#',
  '#oooooooooo#',
  '#oooooooooo#',
  '#oooooooooo#',
  '############'],

 highball: [
  '#........#',
  '#........#',
  '#........#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '##########'],

 pint: [
  '#............#',
  '#............#',
  '#............#',
  '#oooooooooooo#',
  '#oooooooooooo#',
  '.#oooooooooo#.',
  '.#oooooooooo#.',
  '.#oooooooooo#.',
  '.#oooooooooo#.',
  '..#oooooooo#..',
  '..#oooooooo#..',
  '..#oooooooo#..',
  '..#oooooooo#..',
  '...#oooooo#...',
  '...#oooooo#...',
  '...########...'],

 stein: [
  '#..........#....',
  '#..........#....',
  '#..........#....',
  '#oooooooooo#....',
  '#oooooooooo#####',
  '#oooooooooo#...#',
  '#oooooooooo#...#',
  '#oooooooooo#...#',
  '#oooooooooo#...#',
  '#oooooooooo#####',
  '#oooooooooo#....',
  '#oooooooooo#....',
  '#oooooooooo#....',
  '############....'],

 wineglass: [
  '#............#',
  '#............#',
  '#oooooooooooo#',
  '#oooooooooooo#',
  '#oooooooooooo#',
  '.#oooooooooo#.',
  '.#oooooooooo#.',
  '..#oooooooo#..',
  '...#oooooo#...',
  '....#oooo#....',
  '.....####.....',
  '......##......',
  '......##......',
  '......##......',
  '......##......',
  '......##......',
  '..##########..'],

 coupe: [
  '#..............#',
  '#oooooooooooooo#',
  '.#oooooooooooo#.',
  '..#oooooooooo#..',
  '...#oooooooo#...',
  '....########....',
  '.......##.......',
  '.......##.......',
  '.......##.......',
  '.......##.......',
  '...##########...'],

 flute: [
  '#........#',
  '#........#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '.#oooooo#.',
  '.#oooooo#.',
  '..#oooo#..',
  '...####...',
  '....##....',
  '....##....',
  '....##....',
  '....##....',
  '....##....',
  '.########.'],

 bottle: [
  '....##....',
  '....##....',
  '....##....',
  '...####...',
  '...#..#...',
  '..######..',
  '.#oooooo#.',
  '.#oooooo#.',
  '.#oooooo#.',
  '.#oooooo#.',
  '.#oooooo#.',
  '.#oooooo#.',
  '.#oooooo#.',
  '.#oooooo#.',
  '.########.'],

 winebottle: [
  '....##....',
  '....##....',
  '....##....',
  '....##....',
  '....##....',
  '...####...',
  '...#..#...',
  '..######..',
  '.#oooooo#.',
  '.#oooooo#.',
  '.#oooooo#.',
  '.#oooooo#.',
  '.#oooooo#.',
  '.#oooooo#.',
  '.#oooooo#.',
  '.#oooooo#.',
  '.########.'],

 carafe: [
  '....####....',
  '....#..#....',
  '....#..#....',
  '...######...',
  '..#oooooo#..',
  '.#oooooooo#.',
  '#oooooooooo#',
  '#oooooooooo#',
  '#oooooooooo#',
  '#oooooooooo#',
  '#oooooooooo#',
  '#oooooooooo#',
  '############']
};

/* Which glass each serving is drunk from, and how big to draw it.
   The number is the pixel size, set so the drawn liquid grows with the volume:
   area goes as volume^(2/3), normalised inside each category. */
var GLASSMAP = {
 beer:     [['bottle',2.9375],['tumbler',2.1875],['pint',2.25],['stein',2.375],['pint',2.375],['bottle',3.75],['stein',3]],
 wine:     [['wineglass',1.375],['wineglass',1.4375],['wineglass',1.625],['carafe',1.8125],['winebottle',3.3125]],
 spark:    [['flute',1.3125],['flute',1.5625],['winebottle',3.3125]],
 spirit:   [['shot',3.1875],['shot',3.375],['shot',3.6875],['shot',4]],
 cocktail: [['coupe',3],['tumbler',2.375],['tumbler',2.625],['highball',2.8125],['highball',3.125]]
};
var CATGLASS = {beer:'stein', wine:'wineglass', spark:'flute', spirit:'shot', cocktail:'coupe'};

/* px: the size of one pixel. fill: what is in the glass. */
function glassSVG(shape, px, fill, edge){
  var g = GLASS[shape]; if (!g) return '';
  var w = g[0].length, h = g.length, r = '';
  for (var y = 0; y < h; y++){
    var row = g[y], run = 0, ch = '';
    for (var x = 0; x <= w; x++){
      var c = (x < w) ? row.charAt(x) : '\0';
      if (c === ch && c !== '\0'){ run++; continue; }
      if (run && ch !== '.'){
        r += '<rect x="' + (x - run) + '" y="' + y + '" width="' + run + '" height="1" fill="'
           + (ch === 'o' ? fill : edge) + '"/>';
      }
      ch = c; run = 1;
    }
  }
  return '<svg width="' + (w*px) + '" height="' + (h*px) + '" viewBox="0 0 ' + w + ' ' + h
       + '" shape-rendering="crispEdges" aria-hidden="true" focusable="false">' + r + '</svg>';
}
