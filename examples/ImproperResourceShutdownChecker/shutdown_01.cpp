#include <stdio.h>
#include <fcntl.h>

int main(int argc, char **argv) {
    int data = open("file.txt", O_RDWR);

    auto newData = (FILE*)data;

    if(newData == NULL){
        return 0;
    }

    fclose(newData);
}