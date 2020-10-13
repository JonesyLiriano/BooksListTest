using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using BooksApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace BooksApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        const string baseURL = "https://fakerestapi.azurewebsites.net/api/Books";
        [HttpGet]
        public async Task<ActionResult<List<Book>>> GetBooks()
        {            
            List<Book> booksList = new List<Book>();
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync(baseURL))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    booksList = JsonConvert.DeserializeObject<List<Book>>(apiResponse);
                }
            }
            return booksList;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            Book book = new Book();
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync(baseURL + "/" + id))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    book = JsonConvert.DeserializeObject<Book>(apiResponse);
                }
            }
            return book;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Book>> UpdateBook(int id, Book book)
        {
            Book updateBook = new Book();
            using (var httpClient = new HttpClient())
            {
                StringContent content = new StringContent(JsonConvert.SerializeObject(book), System.Text.Encoding.UTF8, "application/json");

                using (var response = await httpClient.PutAsync(baseURL + "/" + id, content))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    updateBook = JsonConvert.DeserializeObject<Book>(apiResponse);
                }
            }
            return updateBook;
        }

        [HttpPost]
        public async Task<ActionResult<Book>> CreateBook(Book book)
        {
            Book newBook = new Book();
            using (var httpClient = new HttpClient())
            {
                StringContent content = new StringContent(JsonConvert.SerializeObject(book), System.Text.Encoding.UTF8, "application/json");

                using (var response = await httpClient.PostAsync(baseURL, content))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    newBook = JsonConvert.DeserializeObject<Book>(apiResponse);
                }
            }
            return newBook;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBook(int id)
        {
            using (var httpClient = new HttpClient())
            {
                using (var validateBook = await httpClient.GetAsync(baseURL + "/" + id))
                {
                    if(validateBook.StatusCode == System.Net.HttpStatusCode.OK)
                    {
                        using (var response = await httpClient.DeleteAsync(baseURL + "/" + id))
                        {
                            string apiResponse = await response.Content.ReadAsStringAsync();
                        }
                    }
                    else
                    {
                        return NoContent();
                    }
                   
                }                
            }
            return Ok();
        }
    }
}
