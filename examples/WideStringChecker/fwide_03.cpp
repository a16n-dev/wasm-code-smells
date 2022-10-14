/**
 * Test Case for Wasm Clang Checker
 *
 * Checker:     wasm.WideStringChecker
 * Test Case:   03
 * Author:      Alexander Nicholson
 * Date:        8/08/2022
 *
 * Expected Result: Warning Raised
 * Explanation:     No call to fwide prior to wprintf call
 *
 */

#include <stdio.h>
#include <cwchar>

int main(int argc, char **argv)
{
    wprintf(L"this is a wide string");
}