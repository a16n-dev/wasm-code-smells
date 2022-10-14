/**
 * Test Case for Wasm Clang Checker
 *
 * Checker:     wasm.AccessEnvChecker
 * Test Case:   03
 * Author:      Alexander Nicholson
 * Date:        8/08/2022
 *
 * Expected Result: No Warning
 * Explanation:     a call to getenv() is not made
 *
 */

#include <stdio.h>
#include <stdlib.h>

int main(int argc, char **argv)
{
    printf("This does not call getenv()");
}