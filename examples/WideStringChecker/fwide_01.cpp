/**
 * Test Case for Wasm Clang Checker
 * 
 * Checker:     wasm.WideStringChecker
 * Test Case:   01
 * Author:      Alexander Nicholson
 * Date:        8/08/2022
 * 
 * Expected Result: Warning Raised
 * Explanation:     If argc != 2, then fwide wont be called
 * 
 */

#include <stdio.h>
#include <cwchar>

int main(int argc, char **argv)
{

    if (argc == 2)
    {
        auto fp = fopen("file.txt", "r");
        fwide(fp, 0);
    }

    wprintf(L"this is a wide string");
}