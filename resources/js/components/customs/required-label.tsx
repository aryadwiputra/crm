import { Label } from '@/components/ui/label'; // Pastikan path ini sesuai dengan lokasi komponen Label Anda
import { cn } from '@/lib/utils'; // Utility untuk menggabungkan classNames, umum di proyek shadcn/ui
import * as React from 'react';

// Definisikan props untuk komponen RequiredLabel.
// Kita memperluas props dari komponen Label agar RequiredLabel dapat menerima
// semua props yang diterima oleh Label (misalnya, htmlFor, className, dll.).
interface RequiredLabelProps extends React.ComponentPropsWithoutRef<typeof Label> {
    // Konten label (teks) akan diteruskan sebagai children.
}

/**
 * Komponen reusable untuk menampilkan label form dengan indikator "required" (tanda bintang merah).
 * Ini membungkus komponen Label yang sudah ada dari '@/components/ui/label'.
 *
 * @param {object} props - Props komponen.
 * @param {React.ReactNode} props.children - Konten label (misalnya, "Nama Lengkap").
 * @param {string} [props.className] - Kelas CSS tambahan opsional.
 * @param {string} [props.htmlFor] - ID dari kontrol form yang terkait dengan label ini.
 * @returns {JSX.Element} Sebuah komponen Label dengan tanda bintang "required".
 */
export function RequiredLabel({ children, className, ...props }: RequiredLabelProps) {
    return (
        <Label className={cn(className)} {...props}>
            {children}
            {/* Tanda bintang merah untuk indikator required */}
            <span className="ml-1 text-red-500">*</span>
        </Label>
    );
}
