/**
 * Test Case for Wasm Clang Checker
 *
 * Checker:     wasm.ErrorWithoutActionChecker
 * Test Case:   02
 * Author:      Alexander Nicholson
 * Date:        8/08/2022
 *
 * Expected Result: No Warning
 * Explanation:     A check is made if fileDesc might be null before calling fclose()
 *
 */

#include <stdio.h>
#include <fcntl.h>

int main(int argc, char **argv) {
    FILE* fileDesc = fopen("file.txt", "w+");

    if(fileDesc == NULL){
        return 0;
    }

    fclose(fileDesc);
}