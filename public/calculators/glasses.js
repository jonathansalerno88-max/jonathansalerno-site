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
   The scale is the share of the tallest icon in its category. */
var GLASSMAP = {
 beer:    [['bottle',.82],['tumbler',.82],['pint',.92],['stein',.92],['pint',1],['bottle',1],['stein',1]],
 wine:    [['wineglass',.76],['wineglass',.88],['wineglass',1],['carafe',.94],['winebottle',1]],
 spark:   [['flute',.82],['flute',1],['winebottle',1]],
 spirit:  [['shot',.74],['shot',.86],['shot',1],['tumbler',.80]],
 cocktail:[['coupe',.88],['tumbler',.88],['highball',.92],['highball',1],['highball',1]]
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
