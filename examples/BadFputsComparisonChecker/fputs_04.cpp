/**
 * Test Case for Wasm Clang Checker
 * 
 * Checker:     wasm.BadFputsComparisonChecker
 * Test Case:   02
 * Author:      Alexander Nicholson
 * Date:        8/08/2022
 * 
 * Expected Result: Warning raised
 * Explanation:     The result of calling fputs() is compared to a variable that might have a value of 0
 * 
 */

#include <stdio.h>
#include <fcntl.h>

int main(int argc, char **argv)
{
    FILE *file = fopen("file.txt", "w+");

    int result = fputs("This is c programming.", file);

    int comparison = 1;

    if(argc == 2){
        comparison = 0;
    }

    if (result == comparison)
    {
        return 1;
    }

    fclose(file);
}