/**
 * Test Case for Wasm Clang Checker
 *
 * Checker:     wasm.ErrorWithoutActionChecker
 * Test Case:   03
 * Author:      Alexander Nicholson
 * Date:        8/08/2022
 *
 * Expected Result: No Warning
 * Explanation:     No check is made to see if fileDesc is NULL, but it is never used so it doesn't matter
 *
 */

#include <stdio.h>
#include <fcntl.h>

int main(int argc, char **argv) {
    FILE* fileDesc = fopen("file.txt", "w+");
}