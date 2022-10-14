/**
 * Test Case for Wasm Clang Checker
 *
 * Checker:     wasm.DoubleFreeChecker
 * Test Case:   01
 * Author:      Alexander Nicholson
 * Date:        8/08/2022
 *
 * Expected Result: Warning Raised
 * Explanation:     free() is called twice on same data
 *
 */

#include <stdio.h>
#include <stdlib.h>

int main(int argc, char **argv)
{
    char *dataBuffer = (char *)malloc(100 * sizeof(char));
    free(dataBuffer);
    free(dataBuffer);
}