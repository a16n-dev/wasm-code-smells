/**
 * Test Case for Wasm Clang Checker
 * 
 * Checker:     wasm.AccessEnvChecker
 * Test Case:   01
 * Author:      Alexander Nicholson
 * Date:        8/08/2022
 * 
 * Expected Result: Warning Raised
 * Explanation:     a call to getenv() will be made
 * 
 */

#include <stdio.h>
#include <stdlib.h>

int main(int argc, char **argv){
    printf("%s%s\n", "test");
}