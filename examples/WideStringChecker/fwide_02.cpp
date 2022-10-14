/**
 * Test Case for Wasm Clang Checker
 *
 * Checker:     wasm.WideStringChecker
 * Test Case:   02
 * Author:      Alexander Nicholson
 * Date:        8/08/2022
 *
 * Expected Result: No Warning
 * Explanation:     fwide will always be called prior to wprintf
 *
 */

#include <stdio.h>
#include <cwchar>

int main(int argc, char **argv)
{

    auto fp = fopen("file.txt", "r");
    fwide(fp, 0);

    wprintf(L"this is a wide string");
}