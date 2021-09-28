const async = require('async');
const _ = require('lodash');
// const logger = require('./logger');

/**
 * Used to run tasks asynchronously.
 * @param  {} tasks
 * @param  {} callback
 * @param  {} pLimit
 */
exports.parallel = function(tasks, callback, pLimit) {
    var limit = pLimit && pLimit >= 1 ? pLimit : 5;

    async.parallelLimit(tasks, limit, callback);
};

exports.series = async.series;
exports.waterfall = async.waterfall;

exports.getNextExtension = function(listNumbers) {
    var orderedArray = listNumbers,
        previousIterationNumber,
        minNumber = 1,
        lowestNumber = minNumber,
        increment = 1;

    orderedArray.sort(function(a, b) {
        var parsedA = parseInt(a),
            parsedB = parseInt(b);

        if (isNaN(parsedA)) {
            return -1;
        } else if (isNaN(parsedB)) {
            return 1;
        } else {
            return parsedA > parsedB ? 1 : -1;
        }
    });

    _.each(orderedArray, function(number) {
        var currentNumber = parseInt(number);

        // First we make sure it's a valid number, if not we move on to the next number
        if (!isNaN(currentNumber)) {
        // logger.info("PKS:40"+":"+currentNumber);

            // If we went through this loop already, previousIterationNumber will be set to the number of the previous iteration
            if (previousIterationNumber) {
                // If there's a gap for a number between the last number and the current number, we check if it's a valid possible number (ie, greater than minNumber)
                // And If yes, we return it, if not we just continue
                if (currentNumber - previousIterationNumber !== increment && previousIterationNumber >= minNumber) {
                    // logger.info("PKS:51"+":"+previousIterationNumber);
                    return previousIterationNumber + increment;
                }
            // else, it's the first iteration, we initialize the minValue to the first number in the ordered array
            // only if it's greater than 1000, because we don't want to recommend lower numbers
            } else if (currentNumber > minNumber) {
                lowestNumber = currentNumber;
            }
            // We store current as the previous number for the next iteration
            previousIterationNumber = currentNumber;
        }
    });

    return (previousIterationNumber) ? previousIterationNumber + increment : lowestNumber;
};
