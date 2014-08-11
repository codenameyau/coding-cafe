/*---------------JSHint---------------*/
/* global ForestLife, PubTest         */
/*------------------------------------*/
'use strict';


(function() {

  // Create PubTest for ForestLife
  var test = new PubTest('ForestLife');

  //  Create all possible ForestLife
  var definitions = ForestLife.prototype.definition;

  // Test Case: sapling
  test.testCase(function() {
    var sapling = new ForestLife('sapling');

    test.assertEqual(sapling.parameters, definitions.sapling,
      'parameters of sapling should match definition of sapling');

    test.assertEqual(sapling.parameters.maturity.age, 12,
      'maturity age of sapling should be 12');

    test.assertEqual(sapling.parameters.spawn.child, '',
      'spawn child of sapling should be blank');

    test.assertEqual(sapling.parameters.spawn.chance, 0.0,
      'spawn probability of sapling should be 0.0');

    test.assertEqual(sapling.parameters.movement, 0,
      'movement of sapling should be 0');
  });

  // Test Case: tree
  test.testCase(function() {
    var tree = new ForestLife('tree');

    test.assertEqual(tree.parameters, definitions.tree,
      'parameters of tree should match definition of tree');

    test.assertEqual(tree.parameters.maturity.age, 120,
      'maturity age of tree should be 120');

    test.assertEqual(tree.parameters.spawn.child, 'sapling',
      'spawn child of tree should be sapling');

    test.assertEqual(tree.parameters.spawn.chance, 0.1,
      'spawn probability of tree should be 0.1');

    test.assertEqual(tree.parameters.movement, 0,
      'movement of tree should be 0');
  });

  // Test Case: elder
  test.testCase(function() {
    var elder = new ForestLife('elder');

    test.assertEqual(elder.parameters, definitions.elder,
      'parameters of elder should match definition of elder');

    test.assertEqual(elder.parameters.maturity.age, 0,
      'maturity age of elder should be 0');

    test.assertEqual(elder.parameters.spawn.child, 'sapling',
      'spawn child of elder should be sapling');

    test.assertEqual(elder.parameters.spawn.chance, 0.2,
      'spawn probability of elder should be 0.2');

    test.assertEqual(elder.parameters.movement, 0,
      'movement of elder should be 0');
  });

  // Test Case: lumberjack
  test.testCase(function() {
    var lumberjack = new ForestLife('lumberjack');

    test.assertEqual(lumberjack.parameters, definitions.lumberjack,
      'parameters of lumberjack should match definition of lumberjack');

    test.assertEqual(lumberjack.parameters.maturity.age, 0,
      'maturity age of lumberjack should be 0');

    test.assertEqual(lumberjack.parameters.spawn.child, '',
      'spawn child of lumberjack should be blank');

    test.assertEqual(lumberjack.parameters.spawn.chance, 0.0,
      'spawn probability of lumberjack should be 0.0');

    test.assertEqual(lumberjack.parameters.movement, 3,
      'movement of lumberjack should be 3');
  });

  // Test Case: bear
  test.testCase(function() {
    var bear = new ForestLife('bear');

    test.assertEqual(bear.parameters, definitions.bear,
      'parameters of bear should match definition of bear');

    test.assertEqual(bear.parameters.maturity.age, 0,
      'maturity age of bear should be 0');

    test.assertEqual(bear.parameters.spawn.child, '',
      'spawn child of bear should be blank');

    test.assertEqual(bear.parameters.spawn.chance, 0.0,
      'spawn probability of bear should be 0.0');

    test.assertEqual(bear.parameters.movement, 5,
      'movement of bear should be 5');
  });


  // Report test results
  test.results();

})();
