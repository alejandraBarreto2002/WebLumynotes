import { Component, OnInit } from '@angular/core';
import { NoteService, Note } from '../../services/note.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Agrega FormsModule aquí
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']

})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  note: Note = { title: '', content: '', userId: '' };
  editing = false;
  totalNotes = 0;
  showForm = false;
  mensaje = '';

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.loadNotes();
    this.loadStatistics();
  }

  loadNotes(): void {
    this.noteService.getNotes().subscribe(data => this.notes = data);
  }

  loadStatistics(): void {
    this.noteService.getStatistics().subscribe(data => {
      this.totalNotes = data.totalNotes;
    });
  }

saveNote(): void {
  this.note.userId = 'usuario1'; // Reemplazar por el ID real del usuario

  if (this.editing && this.note._id) {
    this.noteService.updateNote(this.note._id, this.note).subscribe(() => {
      this.mensaje = 'Nota actualizada correctamente';
      this.resetForm();
      this.loadNotes();
      this.loadStatistics();
      this.ocultarMensaje();
    });
  } else {
    this.noteService.createNote(this.note).subscribe(() => {
      this.mensaje = 'Nota guardada correctamente';
      this.resetForm();
      this.loadNotes();
      this.loadStatistics();
      this.ocultarMensaje();
    });
  }
}
ocultarMensaje(): void {
  setTimeout(() => {
    this.mensaje = '';
  }, 3000); // Oculta el mensaje luego de 3 segundos
}

  editNote(note: Note): void {
    this.note = { ...note };
    this.editing = true;
  }

deleteNote(id: string) {
  this.noteService.deleteNote(id).subscribe(() => {
    this.loadNotes(); // o como actualices la lista
  });
}

  resetForm(): void {
    this.note = { title: '', content: '', userId: '' };
    this.editing = false;
  }
downloadNoteAsPDF(note: Note): void {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Nota', 10, 10);
  doc.setFontSize(12);
  doc.text(`Título: ${note.title}`, 10, 20);
  doc.text('Contenido:', 10, 30);
  doc.text(note.content || '', 10, 40, { maxWidth: 180 }); // evita desbordes

  doc.save(`${note.title || 'nota'}.pdf`);
}

}

