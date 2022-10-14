/**
 * Test Case for Wasm Clang Checker
 *
 * Checker:     wasm.InvalidFreeChecker
 * Test Case:   01
 * Author:      Alexander Nicholson
 * Date:        8/08/2022
 *
 * Expected Result: Warning Raised
 * Explanation:
 *
 */

#include <stdio.h>
#include <stdlib.h>

int main(int argc, char **argv)
{
    char *dataBuffer = (char *)alloca(100 * sizeof(char));
    free(dataBuffer);
}