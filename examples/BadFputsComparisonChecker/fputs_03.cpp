/**
 * Test Case for Wasm Clang Checker
 * 
 * Checker:     wasm.BadFputsComparisonChecker
 * Test Case:   02
 * Author:      Alexander Nicholson
 * Date:        8/08/2022
 * 
 * Expected Result: No Warning
 * Explanation:     The result of calling fputs() is not compared to 0
 * 
 */

#include <stdio.h>
#include <fcntl.h>

int main(int argc, char **argv)
{
    FILE *file = fopen("file.txt", "w+");

    int result = fputs("This is c programming.", file);

    if (result == 1)
    {
        return 1;
    }

    fclose(file);
}