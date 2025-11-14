#include <iostream>
using namespace std;

void cetak(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = key;
        
        cout << "Langkah " << i << ": ";
        cetak(arr, n);
    }
}

int main() {
    int n;
    
    cout << "Masukkan jumlah elemen: ";
    cin >> n;
    
    int data[n];
    
    cout << "Masukkan " << n << " angka:\n";
    for (int i = 0; i < n; i++) {
        cout << "Elemen ke-" << (i+1) << ": ";
        cin >> data[i];
    }
    
    cout << "\nArray awal: ";
    cetak(data, n);
    
    cout << "\nProses sorting:\n";
    insertionSort(data, n);
    
    cout << "\nArray akhir: ";
    cetak(data, n);
    
    return 0;
}