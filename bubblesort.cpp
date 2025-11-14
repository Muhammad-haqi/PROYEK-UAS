#include <iostream>
#include <vector>

void bubbleSort(std::vector<int>& arr) {
    int n = arr.size();
    
    // Loop untuk setiap pass
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        
        // Loop untuk membandingkan elemen yang berdekatan
        for (int j = 0; j < n - i - 1; j++) {
            // Jika elemen sekarang lebih besar dari elemen berikutnya, tukar
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        
        // Tampilkan setiap langkah
        std::cout << "Pass " << (i+1) << ": ";
        for (int k = 0; k < arr.size(); k++) {
            std::cout << arr[k] << " ";
        }
        std::cout << std::endl;
        
        // Jika tidak ada pertukaran, array sudah terurut
        if (!swapped) {
            break;
        }
    }
}

int main() {
    int n;
    
    std::cout << "Masukkan jumlah elemen: ";
    std::cin >> n;
    
    std::vector<int> data(n);
    
    std::cout << "Masukkan " << n << " angka:\n";
    for (int i = 0; i < n; i++) {
        std::cout << "Elemen ke-" << (i+1) << ": ";
        std::cin >> data[i];
    }
    
    std::cout << "\nArray awal: ";
    for (int i = 0; i < data.size(); i++) {
        std::cout << data[i] << " ";
    }
    std::cout << std::endl;
    
    std::cout << "\nProses sorting:\n";
    bubbleSort(data);
    
    std::cout << "\nArray akhir: ";
    for (int i = 0; i < data.size(); i++) {
        std::cout << data[i] << " ";
    }
    std::cout << std::endl;
    
    return 0;
}