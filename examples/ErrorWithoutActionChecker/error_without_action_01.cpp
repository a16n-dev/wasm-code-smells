/**
 * Test Case for Wasm Clang Checker
 *
 * Checker:     wasm.ErrorWithoutActionChecker
 * Test Case:   01
 * Author:      Alexander Nicholson
 * Date:        8/08/2022
 *
 * Expected Result: Warning Raised
 * Explanation:     No check is made if fileDesc might be null
 *
 */

#include <stdio.h>
#include <fcntl.h>

int main(int argc, char **argv) {
    FILE* fileDesc = fopen("file.txt", "w+");

    fclose(fileDesc);
}